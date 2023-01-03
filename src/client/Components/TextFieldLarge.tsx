import React from 'react'
import { styles } from '../styles'

const TextFieldLarge = (props: any) => {

  const field: LargeTextField = props.field; // e.g. 'bio'
  const fieldName = props.fieldName; // e.g. 'bio'
  const oldValue = props.oldValue;
  const setShowTextFieldLargeModal = props.setShowTextFieldLargeModal;
  const updatePrivateMusicianInfo = props.updatePrivateMusicianInfo;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = document.getElementById("text-field-large")

    console.log('in TextFieldLarge component, handleSubmit function triggered, and target value is:', (target as any).value);
    
    
    
    const update: UpdateObj = {}
    update[field] = `${(target as any).value}`

    // TO DO: add more validation here, depending on which field we're updating. (e.g. might reject anything too short, too long, or including spaces or special characters. for handle probably just letters, numbers, dashes, and underscores. for display name, apostrophes but no quote-marks.)

    if (update[field].includes("''")) {
      alert("sorry, string cannot contain doubled single-quote-marks.")
      return;
    }

    updatePrivateMusicianInfo(update);
    setShowTextFieldLargeModal(false);
  }

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('handleCancel function triggered')
    setShowTextFieldLargeModal(false);

  }

  return (
    <div className='flex flex-col justify-center'>

      <form>

        <label htmlFor="text-field-large">
          Enter a new {fieldName}: 
        </label>
        <textarea
          // type="textarea"
          id="text-field-large"
          // className="ml-1"
          className={styles.textArea}
          defaultValue={oldValue}
        >
          
        </textarea>

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

export default TextFieldLarge;