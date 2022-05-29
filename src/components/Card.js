function Card({ image, selected, onClick }) {

  return (
    <div className='card'>
      <div className={selected && 'selected'}>
        <img src={image} alt="" className='card-face' />

        <img className='card-back' src="/assets/card-back-black.png" alt="" onClick={onClick}/>
      </div>
    </div>
  );
}

export default Card;
