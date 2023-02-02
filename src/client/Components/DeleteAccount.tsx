import React from 'react';
import { styles } from '../styles';

const DeleteAccount = (props: any) => {

  const setShowDeleteAccountModal = props.setShowDeleteAccountModal;
  const deleteMusician = props.deleteMusician;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await deleteMusician();
  }

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowDeleteAccountModal(false);
  }

  return (
    <div className='flex flex-col justify-center'>

      <span>
        Are you <b>sure</b> you want to delete your account? This cannot be undone.
      </span>
        
        {/* <br /> */}

        <span>

          <button onClick={handleSubmit} className={styles.buttonSmall}>
            yes
          </button>

          <button onClick={handleCancel} className={styles.buttonSmall}>
            cancel
          </button>

        </span>
      
    </div>
  )
}

export default DeleteAccount;