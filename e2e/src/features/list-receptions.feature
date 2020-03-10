Feature: List receptions

  Scenario: All
    Given There are receptions
     When I list
     Then I see that receptions have been shown

