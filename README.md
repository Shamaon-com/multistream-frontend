## Data Model

# Service
{
    pk: {string | current logged in cognito ID }
    sk: { string | stream key input by user }
    service: {string | the service name}
    username: { string | username of the service if required }
    password: { string | password of the service if required ex: IG }
    active: { boolean | if the service is active or not}
    name: { string | destination name }
}

# Our key

It is possible that user does not have a key

{
    pk: {string | current logged in cognito ID }
    sk: { string | system generated key }
    service: "primary"
    createdat: { integer | date the key was created }
    userpackage: { integer | package the user purchased }
}