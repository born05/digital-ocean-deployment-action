# Digital Ocean Deployment Action

## Usage
```yml
name: Deploy app to DigitalOcean
run-name: Deploy ${{ github.ref_type == 'tag' && github.ref_name || 'latest' }} to ${{ github.ref_type == 'tag' && 'production' || 'acceptance' }}

on:
  push:
    branches: [main]
    tags: ["*"]

jobs:
  ext:
    uses: born05/digital-ocean-deployment-action/.github/workflows/deploy-to-do.yml@main
    secrets: inherit
    with:
      node-version: 21.x
      cms: true

```