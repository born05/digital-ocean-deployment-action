# Digital Ocean Deployment Action

## Usage
```yml
    env:
      GREENSOCK_TOKEN: ${{ secrets.GREENSOCK_TOKEN }}
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - uses: born05/digital-ocean-deployment-action@v1
        with:
          digital-ocean-access-token: ${{ secrets.DIGITALOCEAN_API_TOKEN }}
          node-version: 21.x
          cms: true
```