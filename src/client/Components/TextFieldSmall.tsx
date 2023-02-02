import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles';

const TextFieldSmall = (props: any) => {

  const navigate = useNavigate();

  const field: SmallTextField = props.field; // e.g. 'display_name'
  const fieldName = props.fieldName; // e.g. 'display name'
  const oldValue = props.oldValue;
  console.log('oldValue is:', oldValue);
  const setShowTextFieldSmallModal = props.setShowTextFieldSmallModal;
  console.log('inside of TextFieldSmall component, and setShowTextFieldSmallModal is:', setShowTextFieldSmallModal);
  const updatePrivateMusicianInfo = props.updatePrivateMusicianInfo;
  const signup = props.signup;

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
  if (field === "handle") {
    helperText = "Your handle is your unique identifier in the Human Jukebox app -- it's how people find you. It can be between 1 and 30 characters long, and can contain letters (not case-sensitive), numbers, dashes (-), and underscores(_)."
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = document.getElementById("text-field-small");

    console.log('in TextFieldSmall component, handleSubmit function triggered, and target value is:', (target as any).value);

    const update: Update = {}
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

    if (field === "handle") {
      update.handle = update.handle.toLowerCase();
      console.log('after lowercasing, the update object is:', update);
      const re = /[^a-z0-9\-\_]/;
      if (update[field].match(re) || update[field].length === 0 || update[field].length > 30) {
        alert("handles cannot be empty, cannot have more than 30 characters, and can only contain letters, numbers, en-dashes (-), and underscores (_).");
        return;
      }
    }
    
    updatePrivateMusicianInfo(update);
    // this exception is because the handle is the only user-entered field that must be unique in its column. we don't want to close the modal if the attempt to set the handle failed.
    if (field !== "handle") {
      setShowTextFieldSmallModal(false);
    }
  }

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('handleCancel function triggered');
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

        {(field !== "handle" || !signup) && <button onClick={handleCancel} className={styles.buttonSmall}>
          {signup && "skip"}
          {!signup && "cancel"}
        </button>}

      </form>
      
    </div>
  )
}

export default TextFieldSmall;