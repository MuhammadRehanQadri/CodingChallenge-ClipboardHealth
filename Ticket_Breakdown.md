# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


### Ticket # 1:

There's many to many relation between `Facility` <-> `Agents`. Let's call it `Facility_Agent`.
Create this table if not already created.

#### Acceptance Crieteria:
* `Facility_Agent` table should be created.
* Update documentation.

#### Time/Effort Estimate:
* 1 to 2 hours. (2 story point)

### Ticket # 2:

Add `custom_id` column in `Facility_Agent`.

#### Acceptance Crieteria:
* `Facility_Agent` should have a new column added to it called `custom_id`
* `custom_id` should be unique for each Facility's agent.
* Update documentation.

#### Time/Effort Estimate:
* 1 to 2 hours. (2 story point)

### Ticket # 3:

Inside `getShiftsByFacility` for each agent_id, query `Facility_Agent` table, to get custom_id and append it in the response of `getShiftsByFacility` result.

#### Acceptance Crieteria:
* `getShiftsByFacility` is modified to fetch the custom id of agent from the `Facility_Agent` table.
* It should show the custom_id in response.
* Update documentation.

#### Time/Effort Estimate:
* 3 to 4 hours. (2 story point)

### Ticket # 4:

Response of `getShiftsByFacility` is being inserted into the `generateReport` function. Update `generateReport` function to add custom_ids in response instead of agents ids while generating report.

#### Acceptance Crieteria:
* `generateReport` is modified not show agent id rather it should show the `custom_id` unique for each Facility's agent.
* It should show the custom_id in response.
* Update documentation.

#### Time/Effort Estimate:
* 1 to 2 hours. (1 story point)
