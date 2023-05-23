import React, {useState, useEffect} from "react"
import StudentInfo from "./StudentInfo"

export default function DropdownMenu(props){
    const [selectedOption, setSelectedOption] = useState('');

    function handleOptionChange(event) {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    }

    return (
      <div>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="studentProgress">Student progress</option>
          <option value="studentGrades">Student grades</option>
        </select>
  
        {selectedOption && 
            <StudentInfo 
                course = {props.course} 
                option={selectedOption} 
            />
        }
      </div>
    );
  }