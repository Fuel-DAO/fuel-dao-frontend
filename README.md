# Fuel-DAO Frontend Repository

Repository containing the frontend of the fueldao.io DApp.

---

Deployed at: https://67erj-tiaaa-aaaam-acnxa-cai.icp0.io (https://fueldao.io in the future)

---

Verfying builds:

To get the hash for the `webclient` canister:

- Get the canister ID of the `webclient` from [`canister_ids.json`](https://github.com/Fuel-DAO/fuel-dao-frontend/blob/main/canister_ids.json).
- Get hash using the DFX SDK by running: `dfx canister info <canister-id> --network=ic`.

  (`<canister-id>` for [`webclient` is `67erj-tiaaa-aaaam-acnxa-cai`](https://github.com/Fuel-DAO/fuel-dao-frontend/blob/main/canister_ids.json))

- The output of the above command should contain `Module hash` followed up with the hash value. Example output:

  ```
  $ > dfx canister info 67erj-tiaaa-aaaam-acnxa-cai --network=ic

  Controllers: 5ptmx-dtkmo-ujaoi-yzezh-7cii2-7gx4h-6ub6a-4ooka-2hxri-o6ve3-tqe
  Module hash: 0x3c86d912ead6de7133b9f787df4ca9feee07bea8835d3ed594b47ee89e6cb730
  ```

To get the hash for `webclient` canister deployment:

- Go to [Github actions deployment runs](https://github.com/Fuel-DAO/fuel-dao-frontend/blob/main/.github/workflows/webclient-deploy.yml)
- Open the latest succesful run. ([Click to see an example run](https://github.com/Fuel-DAO/fuel-dao-frontend/actions/runs/))
- Go to `web-client-deploy-dapp` job. ([Click to see an example job](https://github.com/Fuel-DAO/fuel-dao-frontend/actions/runs/9380140293/job/25827409821))
- Open `dfx deploy webclient --network ic --no-wallet` step. You should find the `Module hash` in this step. This value should match the value you got locally. ([Click to see an example step](https://github.com/Fuel-DAO/fuel-dao-frontend/actions/runs/9380140293/job/25827409821#step:9:11))

---
