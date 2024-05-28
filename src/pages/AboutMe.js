import React from 'react'

function AboutMe() {
  return (
    <>
    <div> 
  <div class="flex h-screen items-center justify-center bg-gray-900 p-5">
    <div class="grid md:grid-cols-2 grid-cols-1 items-center gap-10 md:px-10">
      <div>
        <h1 class="text-3xl font-bold text-white"><span class="text-green-500">Hi,</span> I'm Sushil</h1>
        <p className='mb-2 text-sm mt-1 text-white'>Software Engineer</p>
        <p class="mb-6 text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut excepturi magnam enim officiis facilis numquam corporis quos accusantium tempora, dolores quod cum facere architecto soluta atque corrupti a alias perferendis.</p>
        <div class="flex justify-center space-x-5">
          <button class="flex w-full items-center justify-center gap-1 rounded-2xl bg-rose-500 p-5 py-3 font-semibold text-white hover:bg-rose-700">
            Follow
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
          <button class="flex w-full items-center justify-center gap-2 rounded-2xl bg-white p-5 py-3 font-semibold">
            Resume
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <img src=''/>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default AboutMe