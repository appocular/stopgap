import React from 'react';
import ReactModal from 'react-modal';
import { useOvermind } from '../overmind';

// Maybe move to App.js?
ReactModal.setAppElement('#root');

const BugReportButton = ({meta}) => {
  const { state, actions } = useOvermind()

  const contents = (state.bugreport.submitted ?
                    <>
                      <p>Thank you for your help</p>
                      <button className="bugreport" onClick={actions.bugreport.resetBugreport}>Close</button>
                    </>
                    : <>
                        <label htmlFor="email">Your email</label>
                        <input id="email" value={state.bugreport.email} onChange={(event) => actions.bugreport.setEmail(event.target.value)}/>
                        <label htmlFor="description">Please tell us what you think is wrong here</label>
                        <textarea id="description" rows="10" value={state.bugreport.description} onChange={(event) => actions.bugreport.setDescription(event.target.value)}/>
                        <p>This will save a snapshot of the current page and state, so you can move on.</p>
                        <button className="bugreport" onClick={actions.bugreport.submitBug}>Submit bugreport</button>
                      </>
                   );

  return <>
           <button className="bugreport" onClick={actions.bugreport.toggleModal}>Looks wrong? Report a bug!</button>
           <ReactModal className="bugreport-modal" isOpen={state.bugreport.open}>
             <div className="bugreport-form">
               {contents}
             </div>
           </ReactModal>
         </>

}

export default BugReportButton
