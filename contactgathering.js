// ----- Contact Gathering Program -----

let contactList = [];

// Function to capitalize names
function capitalizeWords(input) {
    return input
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}

// Function to gather contact info
function gatherContactInfo() {
    let contactName = "";
    let email = "";
    let currentContact = [];
    let counter = 0;

    while (true) {
        // Input full name
        contactName = prompt(
            "Input contact's full name (type 'STOP' to stop): "
        );

        // Manual break out of loop
        if (contactName === "STOP") {
            break;
        }

        // Capitalize first and last names
        contactName = capitalizeWords(contactName);

        // Mistake handling
        if (contactName.trim() === "") {
            console.log("No name entered, please try again.");
            continue;
        }

        // Input email address
        email = prompt("Input email address: ");

        // Mistake handling
        if (email.trim() === "") {
            console.log("No email entered, please try again.");
            continue;
        }

        currentContact[0] = contactName;
        currentContact[1] = email;

        contactList[counter] = [...currentContact];

        counter += 1;
    }
    return contactList;
}

// Convert list of contacts to Excel readable format
function arrayToCSV(data) {
    const csvRows = [];

    // Add Header
    csvRows.push("Name,Email");

    // Add Data
    for (const contact of data) {
        csvRows.push(contact.join(","));
    }

    return csvRows.join("\n");
}

// Automate download of CSV data
function downloadCSV(data) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "contact_list.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Run the program

gatherContactInfo();
console.log(contactList);

const csvData = arrayToCSV(contactList);
downloadCSV(csvData);
