Feature: List assisteds

  Scenario: All
    Given There are registered assisteds
    When I list
    Then I see all registered assisteds

