import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'

jest.mock('@/services/Api')

import Api from '@/services/Api'
import Reception from '@/Reception'

describe(`<Reception/>`, () => {
  const message = (wrapper) => {
    return wrapper.querySelector(`[data-name='Notification']`)
  }

  const addReception = async () => {
    Api.addReception
      .mockImplementationOnce(() => Promise.resolve({ id: 1 }))
    let wrapper
    await act(async () => {
      const { container } = await render(<Reception/>)
      wrapper = container
    })
    expect(message(wrapper)).toBeNull()
    await act(async () => {
      await fireEvent
        .change(
          wrapper.querySelector(`[data-name='Name']`),
          { target: { value: 'Raimundo' } }
        )
    })
    await act(async () => {
      await fireEvent
        .click(wrapper.querySelector(`[data-trigger='Save']`))
    })
    return wrapper
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it(`should to dispatch data by api`, async () => {
    await addReception()
    expect(Api.addReception).toHaveBeenCalledWith({ name: 'Raimundo' })
  })

  it(`should show the success message`,  async () => {
    expect(message(await addReception()).textContent)
      .toBe(`Reception successful created.`)
  })
})

