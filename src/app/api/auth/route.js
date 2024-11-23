import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return new Response(JSON.stringify({ uid: user.uid }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}