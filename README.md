# Mytheresa - Playwright Framework

Example of test automation framework skeleton

NOTE: 

If ENV variables are passed into command line when running tests .env file will be used, else config file will be used

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set Env variables (2 Options:)

    -  Create config.ts file in /config - [Config template](/config/config-template.ts)
    -  Create .env files in /env - e.g .env.production, .env.staging - [.env template](/env/.env.template)


## Run Tests
1. Run all

```bash
npm test
```

2. Run single (config file variables)

```bash
npm test test-case-1.spec.ts
```

3. Run single (.env file variables)

```bash
ENV=PRODUCTION npm test test-case-1.spec.ts
```

4. Tests can also be run via UI using extension "Playwright Test for VSCode"


## View Report
1. HTML report can be found under /results/index.html