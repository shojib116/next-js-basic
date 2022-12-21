import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetUpForm from '../../components/meetups/NewMeetupForm';

const NewMeetUp = _ => {

  const router = useRouter();
  const addMeetupHandler = async eneteredMeetupData => {
    const response = await fetch('./api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(eneteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    
    router.push('/');
  }

  return ( 
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta name='description' content='You can add a new meetup here' />
      </Head>
      <NewMeetUpForm onAddMeetup ={addMeetupHandler}/>
    </>
  )
}


export default NewMeetUp;