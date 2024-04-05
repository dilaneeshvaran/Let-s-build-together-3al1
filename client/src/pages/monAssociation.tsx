import React from 'react';
import VoteBox from '../components/Votebox';
import '../styles/monAssociation.css';
import EventBox from '../components/Eventbox';

function MonAssociation() {
  let status: "voting ended" | "active";

  status = "voting ended"; // This is valid
  status = "active"; // This is also valid

  const vote = {
    options: ['Option 1', 'Option 2', 'Option 3'],
    result: 'Option 1',
    status: status,
    startDate: new Date('2022-01-01'),
    endDate: new Date('2022-01-31'),
  };

  const event = {
    description: 'This is an upcoming event.',
    date: new Date('2022-02-01'),
  };
  //voir les evenements / votes / sondages en cours/terminés
  //comme des blocks de posts : avec 2 options, valider/croix pour annuler
  //voir les resultats pour les votes/sondages terminés
  //participer/annuler la participation

  return (
    <>
      <h1>Mon Association</h1>
      <p>email : fdc@fdc.com</p>
      <div className='parent'>
        <div className='box'>
          <VoteBox vote={vote} />
        </div>
        <div className='box'>
          <EventBox event={event} />
        </div>
      </div >
    </>
  );
}

export default MonAssociation;