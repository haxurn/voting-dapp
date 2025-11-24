import { ethers } from 'ethers';
import { useState } from 'react';

interface CreatePollProps {
    contract: ethers.Contract | null;
}

export default function CreatePoll({ contract }: CreatePollProps) {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<string[]>(['', '']);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const createPoll = async () => {
        if (!contract) return;
        try {
            const tx = await contract.createPoll(question, options.filter(o => o.trim() !== ''));
            await tx.wait();
            alert('Poll created successfully!');
            setQuestion('');
            setOptions(['', '']);
        } catch (error) {
            console.error(error);
            alert('Error creating poll');
        }
    };

    const loadEthiopiaDefaults = () => {
        setQuestion("Which party do you support for the 2025 General Election?");
        setOptions(["Prosperity Party", "Ezema", "NAMA", "OFC", "Independent"]);
    };

    return (
        <div className="create-poll">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="section-title">Create New Poll</h2>
                <button onClick={loadEthiopiaDefaults} style={{ fontSize: '0.8rem', padding: '0.4rem' }}>
                    Load Election Defaults
                </button>
            </div>

            <input
                type="text"
                placeholder="Enter Poll Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            {options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                />
            ))}

            <button className="add-option-btn" onClick={addOption}>+ Add Another Option</button>
            <button className="action-btn" onClick={createPoll}>Create Poll</button>
        </div>
    );
}
