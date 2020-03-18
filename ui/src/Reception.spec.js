import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'

jest.mock('@/services/Api')

import Api from '@/services/Api'
import Reception from '@/Reception'

describe(`<Reception/>`, () => {
  const mount = async (props = {}) => {
    let wrapper
    await act(async () => {
      const { container } = await render(<Reception { ...props }/>)
      wrapper = container
    })
    return wrapper
  }

  const change = async (wrapper, selector, event) => {
    await act(async () => {
      await fireEvent.change(wrapper.querySelector(selector), event)
    })
  }

  const click = async (wrapper, selector) => {
    await act(async () => {
      await fireEvent.click(wrapper.querySelector(selector))
    })
  }

  const message = (wrapper) => {
    return wrapper.querySelector(`[data-name='Notification']`)
  }

  const fillAndSaveReception = async (wrapper) => {
    await change(
      wrapper, `[data-name='Name']`, { target: { value: 'Raimundo' } }
    )
    await click(wrapper, `[data-trigger='Save']`)
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it(`should to dispatch data by add api`, async () => {
    Api.addReception.mockImplementationOnce(() => Promise.resolve({ id: 1 }))
    const wrapper = await mount()
    await fillAndSaveReception(wrapper)
    expect(Api.addReception).toHaveBeenCalledWith({ name: 'Raimundo' })
  })

  it(`should show the successful created message`,  async () => {
    Api.addReception.mockImplementationOnce(() => Promise.resolve({ id: 1 }))
    const wrapper = await mount()
    expect(message(wrapper)).toBeNull()
    await fillAndSaveReception(wrapper)
    expect(message(wrapper).textContent).toBe(`Reception successful created.`)
  })

  it(`should recover data from api`,  async () => {
    const id = 2
    Api.getReception
      .mockImplementationOnce(() => Promise.resolve({ id, name: 'José' }))
    const wrapper = await mount({ id })
    expect(Api.getReception).toHaveBeenCalledWith(id)
  })

  it(`should fill reception form with data recovered from api`,  async () => {
    const id = 5
    Api.getReception
      .mockImplementationOnce(() => Promise.resolve({ id, name: 'Antônio' }))
    const wrapper = await mount({ id })
    expect(wrapper.querySelector(`[data-name='Name']`).value).toBe('Antônio')
  })

  it(`should to dispatch data by update api`,  async () => {
    const id = 6
    Api.getReception
      .mockImplementationOnce(() => Promise.resolve({ id, name: 'Pedro' }))
    Api.updateReception.mockImplementationOnce(() => Promise.resolve())
    const wrapper = await mount({ id })
    await fillAndSaveReception(wrapper)
    expect(Api.updateReception)
      .toHaveBeenCalledWith(id, { id, name: 'Raimundo' })
  })

  it(`should show the successful updated message`,  async () => {
    const id = 7
    Api.getReception
      .mockImplementationOnce(() => Promise.resolve({ id, name: 'Marcos' }))
    Api.updateReception.mockImplementationOnce(() => Promise.resolve())
    const wrapper = await mount({ id })
    await fillAndSaveReception(wrapper)
    expect(message(wrapper).textContent).toBe(`Reception successful updated.`)
  })
})

