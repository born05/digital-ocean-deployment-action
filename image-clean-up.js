const { exec } = require("child_process");

// This includes only semver versioned tags
const KEEP_VERSIONS_PER_IMAGE = 4;

exec("doctl registry repository list-v2 -o json", (error, stdout, stderr) => {
  if (error || stderr) return console.error(error || stderr);

  JSON.parse(stdout).forEach((r) => {
    exec(
      `doctl registry repository list-manifests ${r.name} -o json`,
      (error, stdout, stderr) => {
        if (error || stderr) return console.error(error || stderr);

        const manifests = JSON.parse(stdout);

        Object.values(
          manifests.reduce((acc, current) => {
            const tag = current.tags?.[0];
            const digest = current.digest;

            const [_, image, version] =
              /([a-zA-z-]+)-(\d+.\d+.\d+)/.exec(tag) || [];
            if (image && version && digest) {
              const versionNumber = parseInt(
                version
                  .split(".")
                  .map((d) => d.padStart(3, "0"))
                  .join("")
              );

              if (!acc[image]) acc[image] = [];

              acc[image].push({
                digest,
                version: versionNumber,
              });
            }

            return acc;
          }, {})
        )
          .map((d) => d.sort((a, b) => b.version - a.version))
          .reduce(
            (acc, current) => [
              ...acc,
              ...current
                .slice(KEEP_VERSIONS_PER_IMAGE)
                .map(({ digest }) => digest),
            ],
            []
          )
          .forEach((digest) => {
            exec(
              `doctl registry repository delete-manifest ${r.name} ${digest} -f`,
              (...out) => {
                const messages = out.filter((m) => m);
                if (messages.length) {
                  console.log(out);
                } else {
                  console.log(`Deleted ${digest}`);
                }
              }
            );
          });
      }
    );
  });
});
