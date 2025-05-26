let contacts = [];

function addContactsInList(contact) {
    const picture            = document.createElement('img');
    const line               = document.createElement('tr');
    const idColun            = document.createElement('td');
    const pictureColun       = document.createElement('td');
    const contactColun       = document.createElement('td');
    const phoneColun         = document.createElement('td');
    const secondarPhoneColun = document.createElement('td');

    picture.src                  = contact.contactPicture
    picture.className            = "contact-picture";
    idColun.innerText            = contact.id;
    contactColun.innerText       = contact.name;
    phoneColun.innerText         = contact.phone;
    secondarPhoneColun.innerText = contact.secondaryPhone;

    pictureColun.appendChild(picture)
    line.appendChild(idColun)
    line.appendChild(pictureColun)
    line.appendChild(contactColun);
    line.appendChild(phoneColun);
    line.appendChild(secondarPhoneColun);

    const contactList = document.getElementById('contacts-list');
    contactList.appendChild(line);
}

function readContactsData() {
    const storage = JSON.parse(localStorage.getItem("contacts"))
    contacts  = storage ? storage : []

    for (let contact of contacts) {
        addContactsInList(contact)
    }
}

function validatePhone(event) {
    let phone = event.target.value;

    phone = phone.replace(/\D/g, '');

    if (phone.length <= 10) {
        phone = phone.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
        phone = phone.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    event.target.value = phone;
}

function addContact() {
    const mensage             = document.getElementById("mensage")
    const inputContactName    = document.getElementById("contact");
    const inputPhone          = document.getElementById("phone");
    const inputSecondaryPhone = document.getElementById("secondary-phone");

    const contactName    = inputContactName.value;
    const phone          = inputPhone.value;
    const secondaryPhone = inputSecondaryPhone.value;
    let   id             = contacts.length + 1;

    const defaultColor = "#000000";
    const redColor     = "#e74c3c";
    const greenColor   = "#27ae60";

    if (!contactName) {
        inputPhone.style.borderColor       = defaultColor;
        inputContactName.style.borderColor = redColor;
        mensage.style.color                = redColor;
        mensage.innerText                  = '"Contact Name" is required.';
        return
    }

    if (!phone || phone.length < 15) {
        inputContactName.style.borderColor = defaultColor
        inputPhone.style.borderColor  = redColor;
        mensage.style.color           = redColor;
        mensage.innerText             = '"Phone Number" is incorrect.'
        return
    }

    if (contactName && phone) {
        inputContactName.style.borderColor = defaultColor
        inputPhone.style.borderColor = defaultColor

        let contactData = {
            'id'             : id,
            'contactPicture' : "./imgs/black-user-member-guest-icon.png",
            'name'           : contactName,
            'phone'          : phone,
            'secondaryPhone' : secondaryPhone
        };

        contacts.push(contactData);
        addContactsInList(contactData);
        localStorage.setItem("contacts", JSON.stringify(contacts))
        mensage.style.color = greenColor;
        mensage.innerText   = 'New contact saved successfully.'

        inputContactName.innerText    = '';
        inputPhone.innerText          = '';
        inputSecondaryPhone.innerText = '';
    }
}

function main() {
    const buttonAddContact    = document.getElementById("add-contact")
    const inputPhone          = document.getElementById("phone");
    const inputSecondaryPhone = document.getElementById("secondary-phone");

    inputPhone.addEventListener("input", validatePhone);
    inputSecondaryPhone.addEventListener("input", validatePhone)
    buttonAddContact.addEventListener("click", addContact)
    readContactsData();
}

window.addEventListener("load", main)