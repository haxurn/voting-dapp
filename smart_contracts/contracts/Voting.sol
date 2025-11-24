// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Voting {
    struct Poll {
        uint256 id;
        string question;
        string[] options;
        uint256[] voteCounts;
        bool exists;
    }

    uint256 public pollCount;
    mapping(uint256 => Poll) public polls;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event PollCreated(uint256 indexed pollId, string question, string[] options);
    event Voted(uint256 indexed pollId, address indexed voter, uint256 optionIndex);

    function createPoll(string memory _question, string[] memory _options) external {
        require(_options.length > 1, "At least two options required");
        
        uint256 pollId = pollCount;
        
        uint256[] memory initialCounts = new uint256[](_options.length);
        
        polls[pollId] = Poll({
            id: pollId,
            question: _question,
            options: _options,
            voteCounts: initialCounts,
            exists: true
        });

        emit PollCreated(pollId, _question, _options);
        pollCount++;
    }

    function vote(uint256 _pollId, uint256 _optionIndex) external {
        require(polls[_pollId].exists, "Poll does not exist");
        require(!hasVoted[_pollId][msg.sender], "Already voted");
        require(_optionIndex < polls[_pollId].options.length, "Invalid option");

        polls[_pollId].voteCounts[_optionIndex]++;
        hasVoted[_pollId][msg.sender] = true;

        emit Voted(_pollId, msg.sender, _optionIndex);
    }

    function getPoll(uint256 _pollId) external view returns (
        uint256 id,
        string memory question,
        string[] memory options,
        uint256[] memory voteCounts
    ) {
        require(polls[_pollId].exists, "Poll does not exist");
        Poll storage poll = polls[_pollId];
        return (poll.id, poll.question, poll.options, poll.voteCounts);
    }
}
