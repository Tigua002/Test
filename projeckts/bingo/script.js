// Decleing the different arrays that i will be needing

var muligeTall = []
var vinnerTall = []
var missing_array = []

// submit_number blir satt i gang når du trykker på knappen "velg antall tall"

function submit_number() {
    // resetter alle array-ene for å unngå overlapping og ekstra tall
    muligeTall = []
    vinnerTall = []
    //checks if the input is a number if it is not, it sends an alert
    if (isNaN(document.getElementById("number_submit").value)) {
        alert("your input of numbers is not a number")
        return
    } else {
        //takes the input and saves it as a variable, to shorter certain parts of code
        var number = parseInt(document.getElementById("number_submit").value)
        // adds all the possible numbers and pushes them to the array
        for (let i = 1; number > muligeTall.length; i++) {
            muligeTall.push(i)
        }
        //just disables some buttons and enables others 
        alert("Der har vi Tallene")
        document.getElementById("randomize_button").removeAttribute("disabled")
        document.getElementById("submit_button").setAttribute("disabled", true)
    }
    //for each existing input element adds the max limit of numbers
    for (let i = 1; i < 6; i++){
        document.getElementById("your_guess" + i).setAttribute("max", muligeTall.length)

    }
}

//randomize function triggerd by the button "trekk tilfeldige tall"
function randomize() {
    //resets the missing_array to prevent stacking and overlapping
    missing_array = []
    //in order to prevent 20 number from being victorious at once it checks if the amonunt is 5 if it is then end the function 
    if (vinnerTall.length == 5) {
        return;
    }
    // checks if the user forgot to enter some inputs and adds the mto an array
    for (let i = 1; i < 6; i++) {
        if (document.getElementById("your_guess" + i).value == "") {
            missing_array.push(i)
        }
    }
    // if the amount of missing items is greater than 0 then it gives an error message 
    if (missing_array.length > 0) {
        alert("You are missing inputs in routes: " + missing_array + " You have to fill in the 5 routes below before proseeding")
        return
    }
    //another error message that gets triggered if the user input a higher number that the possible amount of numbers
    for (let i = 1; i < 6; i++) {
        if (document.getElementById("your_guess" + i).value > muligeTall.length) {

            alert("The guesses must be the same or lower than the amount of numbers")
            document.getElementById("your_guess" + i).value = muligeTall.length
            return;
        }
    }
    //btw most of the for loops are made to run 5 times this is how
    for (let i = 1; i < 6; i++) {
        //makes the for loop run 5 times, but had to use a different name 
        //the loop checks whether or not some inputs are the same
        //then it gives an error message
        for (let x = i; x < 6; x++) {
            if (x == parseInt(i)) {
            } else if (document.getElementById("your_guess" + i).value == document.getElementById("your_guess" + x).value) {
                alert(i + " and " + x + " are the same, change it up")
                return;
            }

        }
    }

    //here is where the error message for the missing array gets realized 
    if (missing_array.length == 0) {
        //checks the length of the muligeTall array
        if (muligeTall.length <= 5) {
            alert("add some numbers to calculate, currently there are/is only " + muligeTall.length + " number/s, you need at least 6")
            //if everything works then calculate it all
        } else {
            //makes the loop run 5 times
            for (let i = 0; i < 5; i++) {
                //creates a variable which is a random number pulled from the muligeTall array
                var random_number = Math.floor(Math.random() * muligeTall.length)
                //adds the number to the vinnerTall array
                vinnerTall.push(muligeTall[random_number])
                //removes the number from the muligeTall array to prevent the same number being pulled twice
                muligeTall.splice(random_number, 1)
                //sorts the function for pretty display purposes
                vinnerTall.sort(function (a, b) { return a - b });

            }
            //disables the inputs to prevent cheating 
            for (let i = 1; i < 6; i++) {
                document.getElementById("your_guess" + i).setAttribute("readonly", true)
            }
            //enables the "sjek kupong" button
            document.getElementById("sjekk_kupong").removeAttribute("disabled")
            //calls the secondary funtion 
            update_numbers()
        }
    }

}
//a secondary funcion to update the numbers 
function update_numbers() {
    //resetts the list of numbers to prevent stacking and overlapp
    document.getElementById("your_numbers").innerHTML = ""
    //and below we update all of the numbers
    //runs the for loop 4 times and the last time we do it manually to prevent the " - "
    for (let i = 0; i < 4; i++) {
        document.getElementById("your_numbers").innerHTML += vinnerTall[i] + " - "
    }
    document.getElementById("your_numbers").innerHTML += vinnerTall[4]
    
}
//a function triggered by the "sjekk kupong" button
function check_cupon() {
    //declares a variable to check the amount of correct ones
    let amount_guessed = 0
    //runs the for loop 5 times one for each input element
    for (let i = 1; i < 6; i++) {
        //declaring variable to make use of the contents easier
        var input_value = parseInt(document.getElementById("your_guess" + i).value)
        //simply check if the vinnerTall array inludes the input value
        if (vinnerTall.includes(input_value)) {
            //increments the amount of guesses
            amount_guessed++
            //changes the colors for fancyness
            document.getElementById("your_guess" + i).style.backgroundColor = "green"
            document.getElementById("your_guess" + i).style.color = "white"
            //changes the colors for fancyness
        } else {
            document.getElementById("your_guess" + i).style.backgroundColor = "red"
            document.getElementById("your_guess" + i).style.color = "white"
        }
    }
    //here we check the amount correct guesses and give a output depending on how many correct ones
    if (amount_guessed == 0) {
        document.getElementById("vinner_display").innerHTML = "You got " + amount_guessed + " right, You suck"
    } else if (amount_guessed <= 4) {
        document.getElementById("vinner_display").innerHTML = "You got " + amount_guessed + " right"
    } else {
        document.getElementById("vinner_display").innerHTML = "You got them all right, congrats"
    }

    //disables plenty of button 
    document.getElementById("randomize_button").setAttribute("disabled", true)
    document.getElementById("sjekk_kupong").setAttribute("disabled", true)
    //creates an element which appers after you checked your kupon 
    var button = document.createElement("button")
    button.setAttribute("class", "restart_button")
    //adds a onclick 
    button.setAttribute("onclick", "yeetus_deletus()")
    button.innerHTML = "Try again?"
    let element = document.getElementById("vinner_vinner")
    element.appendChild(button)

}
//reloads the page in order to restart
function yeetus_deletus(){
    location.reload() 
}
