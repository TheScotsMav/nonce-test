import Image from 'next/image'
import { Inter } from 'next/font/google'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types';

const inter = Inter({ subsets: ['latin'] })

// Doesn't actually need to do anything, could be just return { props: {} }
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const nonce = ctx.req.headers['x-nonce'];
  return { props: {nonce} };
};

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">page nonce: {props.nonce}</code>
        </p>
      </div>

    </main>
  )
}
