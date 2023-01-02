import React from 'react'
import { styles } from '../styles'

const TextFieldSmall = (props: any) => {

  const field: SmallTextField = props.field; // e.g. 'display_name'
  const fieldName = props.fieldName; // e.g. 'display name'
  const setShowTextFieldSmallModal = props.setShowTextFieldSmallModal;
  const updatePrivateMusicianInfo = props.updatePrivateMusicianInfo;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = document.getElementById("text-field-small");

    // const target = e.target as typeof e.target & {
      // value: string
    // };
    console.log('handleSubmit function triggered, and target is:', (target as any).value);
    // TO DO: add validation here (e.g. reject anything too short, too long, or including spaces or special characters. probably just letters, numbers, dashes, and underscores. apostrophes, but no quote-marks.)





    const update: UpdateObj = {}
    update[field] = `${(target as any).value}`

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
      {/* <h4><b>Enter a new {fieldName}</b></h4> */}

      <form>

        <label htmlFor="text-field-small">
          Enter a new {fieldName}: 
        </label>
        <input
          type="text"
          id="text-field-small"
          className="ml-1"
          placeholder="place holder"
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