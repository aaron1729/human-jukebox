import React from 'react'
import { styles } from '../styles'

const TextFieldSmall = (props: any) => {

  const field: SmallTextField = props.field; // e.g. 'display_name'
  const fieldName = props.fieldName; // e.g. 'display name'
  const oldValue = props.oldValue;
  console.log('oldValue is:', oldValue);
  const setShowTextFieldSmallModal = props.setShowTextFieldSmallModal;
  const updatePrivateMusicianInfo = props.updatePrivateMusicianInfo;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = document.getElementById("text-field-small")

    console.log('in TextFieldSmall component, handleSubmit function triggered, and target value is:', (target as any).value);
    
    
    
    const update: UpdateObj = {}
    update[field] = `${(target as any).value}`

    // TO DO: add more validation here, depending on which field we're updating. (e.g. might reject anything too short, too long, or including spaces or special characters. for handle probably just letters, numbers, dashes, and underscores. for display name, apostrophes but no quote-marks.)

    if (update[field].includes("''")) {
      alert("sorry, string cannot contain doubled single-quote-marks.")
      return;
    }

    if (field === "display_name") {
      if (update[field].length === 0) {
        alert("display name cannot be empty");
        return;
      }
      if (update[field].length > 100) {
        alert("display name cannot be more than 100 characters");
        return;
      }
    }
    


    updatePrivateMusicianInfo(update);
    setShowTextFieldSmallModal(false);
  }

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('handleCancel function triggered')
    setShowTextFieldSmallModal(false);

  }

  return (
    <div className='flex flex-col justify-center'>

      <form>

        <label htmlFor="text-field-small">
          Enter a new {fieldName}: 
        </label>
        <input
          type="text"
          id="text-field-small"
          className="ml-1"
          defaultValue={oldValue}
        >
          
        </input>

        <br />

        <button onClick={handleSubmit} className={styles.buttonSmall}>
          submit
        </button>
        <button onClick={handleCancel} className={styles.buttonSmall}>
          cancel
        </button>

      </form>
      
    </div>
  )
}

export default TextFieldSmall;