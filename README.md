# My Recipes

## Description:
Have recipe cards, animation to show recipes being pulled out of a box. Recipes will have nutritional information and portion size. Webpage will have a search function to allow search with an ingredient. Webpage will also have a dropdown list of Health Labels.
Audience: Home chefs.

## User Story & Acceptance Criteria:
As a homechef,
I want to make easy-to-read recipe
So that I can cook at home
Given I want to find a recipe,
When I enter an ingredient into my search bar,
Then I can view a list of recipes containing that ingredient

As a homechef,
I want to select a food restriction
So that I can make recipes that fit my personal needs
Given I want to find a recipe,
When I select a health label in my dropdown
Then I can view a list of recipes that fit that restriction

As a homechef,
I want to view the nutrition information for a recipe
So that I can eat a balanced meal
Given I want the nutrition information of my recipe,
When I select recipe and enter portion size
Then I can view the nutrition information

## Pseudo Code
1. When page loads, there is styling on the left side and search box and filter for use
1. User inputs a search term and selects submit button (event handler)
1. User is able to filter on health label, meal type and cuisine
1. Create submit button handler that will make API call to the edamam to recipe info. Identify data attribute (could be ingredient list for e.g. for HW it was City)
1. Make another call to edamame nutrition to get the nutrition info for all 5 recipes
1. Upon making API call, populate a list of recpies (top 5) that confirm to search and filter criteria
    * Create tags to display recipe cards that lists the top 5 recipes
    * User selects a recipe to view
    * All of the other recipe cards disappear and the selected recipe container expands
    * The recipe and image and nutrition info are shown for selcted recipe.
1. User is able to change serach term and filter to find a new recipe.

## Validation Steps:
1. 
