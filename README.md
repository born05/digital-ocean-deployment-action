# Digital Ocean Deployment Action

## Usage
```yml
steps:
  - uses: born05/digital-ocean-deployment-action@v1
    with:
      digital-ocean-access-token: ${{ secrets.DIGITALOCEAN_API_TOKEN }}
      gsap-npm-token: ${{ secrets.GSAP_NPM_TOKEN }}
      gh-registry-packages: ${{ secrets.GH_REGISTRY_PACKAGES }}
      node-version: 21.x
      cms: true
```