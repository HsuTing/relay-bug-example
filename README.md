# Relay bug example

I write a simple example. Use `set cookie` to login. It should change the value of `isLogin` after user login.

#### How to use

- `yarn install`
- `yarn relay`
- `yarn dev`

#### Reproduce the bug

- click `login` button
- refresh website

You can see this: `Text content did not match. Server: "login" Client: "Hi!"`.
In the server side, the data which is requested by `fetchQuery` is right:

```json
{
  "relayData": [
    [
      {
        "queryID": "pages_userQuery",
        "variables": {}
      },
      {
        "_res": {
          "size": 0,
          "timeout": 0
        },
        "ok": true,
        "status": 200,
        "url": "http://localhost:8000/graphql",
        "headers": {},
        "json": {
          "data": {
            "user": {
              "isLogin": true,
              "id": "user"
            }
          }
        },
        "data": {
          "user": {
            "isLogin": true,
            "id": "user"
          }
        }
      }
    ]
  ]
}
```

But it render `<button>login</button>`, this button is used to ask user login.
