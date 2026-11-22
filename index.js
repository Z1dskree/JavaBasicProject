'use strict';

const mockData = require('./mockData.js').data;
const prompt = require('prompt-sync')();

const profile = {};

// Functions to ask for user input with validation
function askForName(question) {
  let answer = prompt(question);
  while (answer.trim() === "" || !/[a-z]/i.test(answer)) {
    answer = prompt("The name cannot be empty and must contain at least one letter. " + question);
  }
  return answer.trim();
}

// Function to ask for age until a valid input is given
function askForAge(question, minimumAge) {
  let answer = prompt(question);
  while (answer.trim() === "" || isNaN(answer) || answer < minimumAge) {
    answer = prompt(`Please enter an age of ${minimumAge} or older: `);
  }
  return Number(answer);
}

// Function to ask for gender until a valid input is given
function askForGender(question) {
  let answer = prompt(question).toUpperCase();
  while (answer !== "M" && answer !== "F" && answer !== "X") {
    answer = prompt("please enter M, F or X: ").toUpperCase();
  }
  return answer;
}

// Function to ask for location until a valid input is given
function askForLocation(question) {
  let answer = prompt(question);
  while (answer.trim().toLowerCase() !== "rural" && answer.trim().toLowerCase() !== "city") {
    answer = prompt("Please enter either 'rural' or 'city': ");
  }
  return answer.trim().toLowerCase();
}

// Function to ask for maximum age preference until a valid input is given
function askForMaxAgePreference(question, minimumAge) {
  let answer = prompt(question);
  while (answer.trim() === "" || isNaN(answer) || answer <= minimumAge) {
    answer = prompt(`Please enter an age older than ${minimumAge}: `);
  }
  return Number(answer);
}

profile.first_name = askForName("What is your first name? ");

profile.last_name = askForName("What is your last name? ");

profile.age = askForAge("What is your age? ",18);

profile.min_age_interest = askForAge("What is the minimum age you want to date? ",18);

profile.max_age_interest = askForMaxAgePreference("What is the maximum age you want to date? ", profile.min_age_interest);

profile.gender = askForGender("What is your gender? (M/F/X) ");

profile.gender_preference = askForGender("What gender do you want to date? (M/F/X) ");

profile.location = askForLocation("What is your location? ");

//compares and matches the profile with mock data based on age
function isCandidateInAgeRange(candidate) {
  return candidate.age > profile.min_age_interest && candidate.age <= profile.max_age_interest;
}

function isProfileInCandidateAgeRange(candidate) {
  return profile.age > candidate.min_age_interest && profile.age <= candidate.max_age_interest;
}

//compares and matches the profile with mock data based on gender and location
function isCandidateGenderMatch(candidate) {
  return profile.gender_preference === candidate.gender;
}

function isProfileGenderMatch(candidate) {
  return candidate.gender_preference === profile.gender;
}

function isLocationMatch(candidate) {
  return profile.location === candidate.location;
}

// Function to check if a candidate matches the profile based on all criteria
function isMatch(candidate) {
  return isCandidateInAgeRange(candidate) && isProfileInCandidateAgeRange(candidate) &&
         isCandidateGenderMatch(candidate) && isProfileGenderMatch(candidate) && isLocationMatch(candidate);
}

const matches = [];
for (const candidate of mockData) {
  if (isMatch(candidate)) {
    matches.push(candidate);
  }
}

if (matches.length === 0) {
  console.log("No matches found.");
} else {
  console.log("Number of matches found: " + matches.length);
  for (const match of matches) {
    console.log(`Name: ${match.first_name} ${match.last_name}, Age: ${match.age}, Gender: ${match.gender}, Location: ${match.location}`);
  }
}
