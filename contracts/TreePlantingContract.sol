// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TreePlantingContract {
    // Structure to represent a tree planting event
    struct TreePlantingEvent {
        uint256 eventId;
        address planter;
        string locationLatitude;
        string locationLongitude;
        string treeSpecies;
        uint256 plantingDate;
        bool verified;
    }

    // Mapping to store all tree planting events
    mapping(uint256 => TreePlantingEvent) public events;

    // Counter for generating unique event IDs
    uint256 private eventIdCounter;

    // Event emitted when a new tree planting event is added
    event TreePlantingEventAdded(uint256 indexed eventId, address indexed planter);

    // Modifier to restrict access to certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    // Contract owner
    address public owner;

    // Constructor to set the contract owner
    constructor() {
        owner = msg.sender;
    }

    // Function to add a new tree planting event
    function addTreePlantingEvent(
        string memory _locationLatitude,
        string memory _locationLongitude,
        string memory _treeSpecies,
        uint256 _plantingDate
    ) external payable {
        require(bytes(_locationLatitude).length > 0 && bytes(_locationLongitude).length > 0, "Location data is required");

        // Generate a new event ID
        eventIdCounter++;

        // Create a new tree planting event
        TreePlantingEvent storage newEvent = events[eventIdCounter];
        newEvent.eventId = eventIdCounter;
        newEvent.planter = msg.sender;
        newEvent.locationLatitude = _locationLatitude;
        newEvent.locationLongitude = _locationLongitude;
        newEvent.treeSpecies = _treeSpecies;
        newEvent.plantingDate = _plantingDate;
        newEvent.verified = false;

        // Emit an event to log the addition of the new event
        emit TreePlantingEventAdded(eventIdCounter, msg.sender);
    }

    // Function to verify a tree planting event
    function verifyTreePlantingEvent(uint256 _eventId) external onlyOwner {
        require(_eventId <= eventIdCounter && _eventId > 0, "Invalid event ID");
        require(events[_eventId].verified == false, "Event is already verified");

        events[_eventId].verified = true;
    }
}
