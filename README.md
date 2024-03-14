# CSTI Corp Code Challenge 🚀
Backend server for manage credit card tokenization process.

1. Kubernetes Infrastructure

  ![Imagen documentation](./assets/kubernetes-arquitecture.png "documentation")

2. Software Architecture (For this project, hexagonal architecture was used)

```md
    └──src
       └── gateway-pos
           ├── application
           │   ├── card-application.ts
           │   ├── services
           │   │   └── jwt.service.ts           
           ├── domain
           │   ├── entities
           │   │   └── card.entity.ts
           │   │   └── card.create-token.entity.ts
           │   │   └── token.entity.ts
           │   └── repositories
           │       └── card.repository.ts
           └── infrastructure
               ├── api
               │   ├── controllers
               │   │   └── card.controller.ts
               │   ├── dtos
               │   │    ├── request
               │   │    │   └── create-token.dto.ts
               │   │    └── response
               │   │        └── credit-card.dto.ts
               │   │        └── token.dto.ts
               │   └── guards   
               │   │    ├── auth.guard.ts   
               │   │    └── token.guard.ts        
               ├── db
               │   └── redis.client.ts
               └── card.infrastructure.ts
```


## Setup project
### Requisites
 - Node.js **v20** or higher
 - Kubernetes with kukectl **v1.28** or higher
### Previous commands
 - Install dependencies
    ```bash
    # Install node dependencies
    $ npm install

    # Run server (Optional, in the next section you will look at the steps 
    # to deploy and run the app in local Kubernetes cluster)
    $ npm run start
    ```

## Commands

### 1. Run tests
 ```bash
  $ npm run test:unit:e2e
  ```

### 2. Deploy app in local Kubernetes cluster
```bash
$ npm run k8:deploy

#Verify all resources (OPTIONAL)
$ kubectl get pods,svc,ingress -n culqi-tokenization
```
![Imagen k8 cluster](./assets/kubernetes-cluster.png "k8 cluster")


## API Documentation
For see Open API documentation:
1. Follow the previous steps to set up the Kubernetes cluster.
1. Open a web browser ex. Chrome and go to the next url -> http://localhost/api
![Imagen documentation](./assets/swagger-doc.png "documentation")

## Endpoints
### `POST api/v1/card/token` - Create Token 
- Request example:
    ```
    curl --request POST \
      --url http://localhost/api/v1/card/token \
      --header 'Authorization: Bearer pk_test_BuyK6NguwyPEu33d' \
      --header 'Content-Type: application/json' \
      --data '{
      "card_number": "4310374476148800",
      "cvv": "123",
      "expiration_month": "10",
      "expiration_year": "2026",
      "email": "user@gmail.com"
    }'
    ```
- Response example:
    ```
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpY3RvckB5YWhvby5lcyIsImNhcmRfbnVtYmVyIjoiNDMxMDM3NDQ3NjE0ODgwMCIsImlhdCI6MTcxMDM3NDcwOSwiZXhwIjoxNzEwMzc0NzM5fQ.tH0K4i-yUAm6nVqiZDWnwIjsjUeasdyLSl9w2UvcChE"
    }
    ```
### `GET api/v1/card` - Get card information
- Request example:
    ```
    curl --request GET \
      --url http://localhost/api/v1/card \
      --header 'Authorization: Bearer pk_test_BuyK6NguwyPEuD33' \
      --header 'User-Agent: insomnia/8.6.1' \
      --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiY2FyZF9udW1iZXIiOiI0MzEwMzc0NDc2MTQ4ODAwIiwiaWF0IjoxNzEwMzc1MTY3LCJleHAiOjE3MTAzNzUxOTd9.O8-cBNe7FYhkAxe93g6DYKP2ZZA3k93VfeJPLS7yozY'
    ```
- Response example:
    ```
    {
      "card_number": "4310374476148800",
      "expiration_month": "10",
      "expiration_year": "2026",
      "email": "user@gmail.com"
    }
    ```