Feature: Remove reception

  Scenario: Success
    Given I list all receptions
     When I remove
     Then I see that receptions have been decreased

