import DeployButton from '../components/DeployButton'
import AuthButton from '../components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import ConnectSupabaseSteps from '@/components/tutorial/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/tutorial/SignUpUserSteps'
import Header from '@/components/Header'

export default async function Index() {
  const supabase = createClient()
  const { data: notes } = await supabase.from('notes').select()

  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'></nav>

      <div className='flex-1 flex flex-col gap-20 max-w-4xl px-3'>
        <Header />
        <main className='flex-1 flex flex-col gap-6'>
          <h2 className='font-bold text-4xl mb-4'>Next steps</h2>
          <SignUpUserSteps />

          <h3 className='font-bold text-2xl mt-10'>Notes from Supabase</h3>
          <div className='flex flex-col gap-4'>
            {notes?.map((note) => (
              <div
                key={note.id}
                className='border-slate-600/50 p-4 rounded-lg border'
              >
                <p className='font-bold'>{note.title}</p>
                <p className='text-gray-200'>{note.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      <footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs'>
        <p>
          Powered by{' '}
          <a
            href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
            target='_blank'
            className='font-bold hover:underline'
            rel='noreferrer'
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  )
}
