import React from 'react'
import { styles } from '../styles'

const TextFieldSmall = (props: any) => {

  const field: SmallTextField = props.field; // e.g. 'display_name'
  const fieldName = props.fieldName; // e.g. 'display name'
  const oldValue = props.oldValue;
  console.log('oldValue is:', oldValue);
  const setShowTextFieldSmallModal = props.setShowTextFieldSmallModal;
  const updatePrivateMusicianInfo = props.updatePrivateMusicianInfo;

  let helperText;
  if (field === "display_name") {
    helperText = "This is the name that's shown at the top of your page. You can use emojis if you like 😁"
  }
  if (field === "instagram") {
    helperText = "This allows audience members to connect with you! (And in the future, we'll give the option to use your IG profile pic here.) Don't include the @ sign."
  }
  if (field === "venmo") {
    helperText = "This allows audience members to tip you! Don't include the @ sign."
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = document.getElementById("text-field-small")

    console.log('in TextFieldSmall component, handleSubmit function triggered, and target value is:', (target as any).value);
        
    const update: UpdateObj = {}
    update[field] = `${(target as any).value}`

    // data validation

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

    if (field === "instagram") {
      const re = /[^A-Za-z0-9.]/;
      if (update[field].match(re) || update[field].length > 30) {
        alert("instagram handles can only be up to 30 characters long, and they can only contain letters, numbers, and periods.")
        return;
      }
    }

    if (field === "venmo") {
      const re = /[^A-Za-z0-9\-\_]/;
      if (update[field].match(re) || update[field].length > 30) {
        alert("venmo handles can only be up to 30 characters, and can only contain letters, numbers, en-dashes (-), and underscores (_).");
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
          Enter your {fieldName} here: 
        </label>
        <input
          type="text"
          id="text-field-small"
          className="ml-1"
          defaultValue={oldValue}
        >
        </input>
        <p className={styles.helperText}>{helperText}</p>
        
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