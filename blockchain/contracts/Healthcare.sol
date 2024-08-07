// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Healthcare {

    address public admin;

    struct Patient {
        uint id;
        string name;
        address patientAddress;
        string[] documents;
    }

    struct Doctor {
        uint id;
        string name;
        address doctorAddress;
    }

    mapping(address => Patient) public patients;
    mapping(address => Doctor) public doctors;
    mapping(address => bool) public registeredPatients;
    mapping(address => bool) public registeredDoctors;

    uint public patientCount = 0;
    uint public doctorCount = 0;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyAdminOrSelf(address _address) {
        require(msg.sender == admin || msg.sender == _address, "Only admin or self can perform this action");
        _;
    }

    modifier onlyAdminOrDoctor() {
        require(msg.sender == admin || registeredDoctors[msg.sender], "Only admin or doctor can perform this action");
        _;
    }

    modifier onlyAdminOrSelfOrDoctor(address _patientAddress) {
        require(msg.sender == admin || msg.sender == _patientAddress || registeredDoctors[msg.sender], "Only admin, self, or doctor can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerPatient(address _patientAddress, string memory _name) public {
        require(msg.sender == admin || msg.sender == _patientAddress, "Only admin or self can register");
        require(!registeredPatients[_patientAddress], "Patient already registered");

        patientCount++;
        patients[_patientAddress] = Patient(patientCount, _name, _patientAddress, new string[](0));
        registeredPatients[_patientAddress] = true;
    }

    function registerDoctor(address _doctorAddress, string memory _name) public {
        require(msg.sender == admin || msg.sender == _doctorAddress, "Only admin or self can register");
        require(!registeredDoctors[_doctorAddress], "Doctor already registered");

        doctorCount++;
        doctors[_doctorAddress] = Doctor(doctorCount, _name, _doctorAddress);
        registeredDoctors[_doctorAddress] = true;
    }

    function uploadDocument(string memory _document) public {
        require(registeredPatients[msg.sender], "Only registered patients can upload documents");

        patients[msg.sender].documents.push(_document);
    }

    function getPatientData(address _patientAddress) public view onlyAdminOrSelfOrDoctor(_patientAddress) returns (Patient memory) {
        require(registeredPatients[_patientAddress], "Patient not registered");

        return patients[_patientAddress];
    }

    function getDoctorData(address _doctorAddress) public view onlyAdminOrDoctor returns (Doctor memory) {
        require(registeredDoctors[_doctorAddress], "Doctor not registered");

        return doctors[_doctorAddress];
    }

    function getPatientDocuments(address _patientAddress) public view onlyAdminOrSelfOrDoctor(_patientAddress) returns (string[] memory) {
        require(registeredPatients[_patientAddress], "Patient not registered");

        return patients[_patientAddress].documents;
    }
}
