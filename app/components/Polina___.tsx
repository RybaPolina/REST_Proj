import React from 'react';

type PolinaProps = {
    name: string;
    age: number;
};

const Polina: React.FC<PolinaProps> = ({ name, age }) => {
    return (
        <div>
            <h1>Hello, my name is {name}</h1>
            <p>I am {age} years old.</p>
        </div>
    );
};

export default Polina;