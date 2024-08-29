import Question from "@/components/forms/Question"
import { getUserById } from "@/lib/actions/user.action"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const Page = async () => {
  //const {userId} = auth()
  const userId = 'your_clerk_id_here'
  if (!userId) redirect('/sign-in')

  try {
    const mongoUser = await getUserById({ userId });
    console.log(mongoUser);
  } catch (error) {
    console.log('Error fetching user:', error);
  }
  return (
    <div>
      <h1 className=" h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-8">
        <Question  />
      </div>
    </div>
  )
}

export default Page