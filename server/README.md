![Numida](./logo.numida.png)

# SERVER SETUP INSTRUCTIONS

This is a python server and requires that you have `python 3.9+` installed on your machine.

## Installation

> You will need docker installed in order to run the server

1. Change directory to the server folder `cd server`
2. Build and run the server `docker compose up --build`
3. Confirm your application is available at http://localhost:2024

## API Documentation

### GraphQL Endpoint

**URL:** `/graphql`

**Method:** `POST`

**Description:** This endpoint allows you to query loans and their payments using GraphQL.

**Example Query:**

To get all existing loans with payments:

```graphql
{
  loans {
    id
    name
    interestRate
    principal
    dueDate
    termMonths
    payments {
      id
      paymentDate
      amount
    }
  }
}
```

To get all loan payments:

```graphql
{
  loanPayments {
    id
    loanId
    paymentDate
    amount
  }
}
```

### REST Endpoints

### Home Endpoint

**URL:** `/`
**Method:** `GET`

**Description:** This endpoint returns a welcome message.

**Response:**

```json
{
  "message": "Welcome to the Numida API"
}
```

### Create Payment Endpoint

**URL:** `/api/payments`
**Method:** `POST`

**Description:** Create a new payment for an existing loan.

**Request Body:**

```json
{
  "loanId": 1,
  "paymentAmount": 500
}
```
