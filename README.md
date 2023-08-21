## Getting Started

Run the [Ory CLI](https://www.ory.sh/docs/guides/cli/installation) tunnel.

```shell
ory tunnel http://localhost:3000 --project <project-slug> --dev
```

<!-- NEXT_PUBLIC_ORY_SDK_URL ?-->

The tunnel will now _mirror_ the Ory APIs under `http://localhost:4000` which we
have explicity told our NextJS app to use through the `ORY_SDK_URL`
export.
