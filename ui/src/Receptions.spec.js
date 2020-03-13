import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'

jest.mock('@/services/Api')

import Receptions from '@/Receptions'
import Api from '@/services/Api'

describe(`<Receptions/>`, () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it(`should show loaded receptions`, async () => {
    Api.loadReceptions
      .mockImplementationOnce(() => Promise.resolve([{ id: 2, name: 'Foi' }]))
    let wrapper
    await act(async () => {
      const { container } = await render(<Receptions/>)
      wrapper = container
    })
    expect(Api.loadReceptions).toHaveBeenCalled()
    expect(wrapper.querySelectorAll(`[data-name='Line']`)).toHaveLength(1)
  })

  it(`should remove reception`, async () => {
    const receptions = [
      { id: 1, name: 'Primeiro' },
      { id: 2, name: 'Segundo' }
    ]
    Api.loadReceptions.mockImplementationOnce(() => Promise.resolve(receptions))
    Api.removeReception.mockImplementationOnce(() => Promise.resolve())
    let wrapper
    await act(async () => {
      const { container } = await render(<Receptions/>)
      wrapper = container
    })
    expect(Api.loadReceptions).toHaveBeenCalled()
    expect(wrapper.querySelectorAll(`[data-name='Line']`)).toHaveLength(2)
    await act(async () => {
      await fireEvent
        .click(wrapper.querySelector(`[data-trigger='Remove'][data-id='2']`))
    })
    expect(wrapper.querySelectorAll(`[data-name='Line']`)).toHaveLength(1)
    expect(Api.removeReception).toHaveBeenCalled()
  })
})
