import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'

jest.mock('@/services/Api')
jest.mock('@/services/Navigation')

import Receptions from '@/Receptions'
import Api from '@/services/Api'
import Navigation from '@/services/Navigation'

describe(`<Receptions/>`, () => {
  const loadReceptions = async () => {
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
    return wrapper
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it(`should show loaded receptions`, async () => {
    const wrapper = await loadReceptions()
    expect(Api.loadReceptions).toHaveBeenCalled()
    expect(wrapper.querySelectorAll(`[data-name='Line']`)).toHaveLength(2)
  })

  it(`should remove reception`, async () => {
    const wrapper = await loadReceptions()
    await act(async () => {
      await fireEvent
        .click(wrapper.querySelector(`[data-trigger='Remove'][data-id='2']`))
    })
    expect(wrapper.querySelectorAll(`[data-name='Line']`)).toHaveLength(1)
    expect(Api.removeReception).toHaveBeenCalled()
  })

  it(`should redirect to edit reception`, async () => {
    const wrapper = await loadReceptions()
    await act(async () => {
      await fireEvent
        .click(wrapper.querySelector(`[data-trigger='Edit'][data-id='2']`))
    })
    expect(Navigation.go).toHaveBeenCalledWith('/#/reception/edit/2')
  })
})
