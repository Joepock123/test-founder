# Founder - Tech test

## Getting Started

First, clone the repo.

CD into the project directory.

Install the project dependencies `npm i`.

Run the project `npm run dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser.

Run the unit tests with `npm test`.

## User Stories and Acceptablity Criteria

### User Stories

1. As a firm admin. I want to see if a list of customers reversal requests are eligible for a refund.

### Acceptability Criteria

1. Provided a timezone and Sign up date, calculate if the customer is eligible for the old or new TOS.
2. Provided a request source, timezone, request date and time, calculate when the refund request was registered.
3. Provided the timezone, investment time and date, caclulate the deadline for a customer to receive a refund.
4. Provided a list of customers, show if the customers' refund request is approved or denied.

## Challenges and gotchas

- The crux and complexity of this challenge is in understanding the requirements and traslating them into robust functions to calculate the answer.
- Speed, 2 hours is not much time to understand so many requirements and translate them to reliable business logic.
- Handling dates and times across different timezones can be tricky to manage.
- The data in the refund request list has not been validated. It is possible there are errors in the column values.

## Assumptions

- The dates and times are correct. There are no complications in addition to the Europe and US date formatting. For example, I do not need to check a time of 27:00 or a US date of 28/6/2023 has been submitted.
- The TOS date is relative to the timezone. For example, _A PST UST based customer signing up at 23:59 PST US time on the cut off date is valid for old TOS_.
- Cutoff times are not inclusive. For example, _17:00 is out of work hours_.

## Technical Choices

- Data Validation anf type safety - zodd: When using a non-relational db with a dynamic schema, it is important to validate the data to avoid errors with business logic and guarantee the contract with the client. This proved useful when the schema picked up _Europe (GMT)_ which was not mentioned in the _Clarifications_ text.
- Front End Framework - Next.js: I used this as it can be quickly setup with typescript, ESLint and Tailwind.
- UI: I used [shadcn](https://ui.shadcn.com/docs) components as they are rapid to setup and beautiful. Components (such as a table) can be added simply with `npx shadcn-ui@latest add table`.
- Data Fetching - next.js api and swr: I wanted to mock a common data fetching pattern, and keep the business logic calculating the values separate from the front-end. SWR is simple to setup and use.
- Testing - Jest: With multiple calculation steps, to be confident in the answers I wanted a suite of unit tests to verify the business logic.

## Reflections and lessons learnt

- With more time, this challenge may suit at Test Driven Development (TDD) approach. At least, instead of adding all the tests at the end, creating them after each step would have been preferable.
- This may have left more time to add some integration tests to add further reliablity to the flow.
