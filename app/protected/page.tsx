import AuthButton from '@/components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import FetchDataSteps from '@/components/tutorial/FetchDataSteps'
import Header from '@/components/Header'
import { redirect } from 'next/navigation'
import { SubmitButton } from '../login/submit-button'

export default async function ProtectedPage() {
  const supabase = createClient()
  const { data: notes } = await supabase.from('notes').select()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const addDisplayName = async () => {
    'use server'
    const supabase = createClient()

    const { data } = await supabase.auth.updateUser({
      data: { displayName: 'Fabio Alcocer' },
    })

    console.log(data)
  }

  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <div className='w-full'>
        <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
          <div className='w-full max-w-4xl flex justify-end items-center p-3 text-sm'>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className='flex-1 flex flex-col gap-20 max-w-4xl px-3'>
        <Header />
        <main className='flex-1 flex flex-col gap-6'>
          <h2 className='font-bold text-4xl mb-4'>Next steps</h2>
          <FetchDataSteps />

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

          <SubmitButton
            formAction={addDisplayName}
            className='border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 max-w-max'
            pendingText='Signing Up...'
          >
            Add display name
          </SubmitButton>
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
