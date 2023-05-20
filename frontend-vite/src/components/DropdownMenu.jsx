import React, {useState} from "react"
import StudentInfo from "./StudentInfo"

export default function DropdownMenu(){
    const [selectedOption, setSelectedOption] = useState('');
    const [componentProps, setComponentProps] = useState(null);
  
    function handleOptionChange(event) {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        let selectedProps = null
        // Run corresponding function based on selected option
        if (selectedValue === 'studentProgress') {
            selectedProps = getStudentProgress();
        } else if (selectedValue === 'studentGrades') {
            selectedProps = getStudentGrades();
        } 
        setComponentProps(selectedProps)
    }
  
    function getStudentProgress() {
        // Function logic for option A
        return {
            type: 'Student progress goes here',
        };
    }
  
    function getStudentGrades() {
        // Function logic for option B
        return {
            type: 'Student grades go here',
        };
    }
  
    return (
      <div>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="studentProgress">Student progress</option>
          <option value="studentGrades">Student grades</option>
        </select>
  
        {componentProps && <StudentInfo {...componentProps} />}
      </div>
    );
  }