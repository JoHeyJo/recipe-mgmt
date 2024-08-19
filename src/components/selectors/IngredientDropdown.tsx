import { useState, useEffect, ChangeEvent } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { getByDisplayValue } from '@testing-library/react';
import { Option } from '../../utils/types';
import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import DropdownWithSearch from '../ui/DropdownWithSearch';

function uniqueID() {
  return Math.random();
}

const unique: any = () => Math.random()

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type IngredientDropDown = {
  name: string
  handleOptionChange: (state: string, option: Option) => void;
  options: Option[];
  handleAddOption: (state: string, option: Option) => void;
}

/** IngredientDropDown 
 * 
 * Ingredient input field with capability to create new ingredients.
 * Makes API request to create new ingredient
 * 
 * IngredientInputGroup -> IngredientDropDown
 */

function IngredientDropDown({ name, handleOptionChange, options, handleAddOption }: IngredientDropDown) {

  /** Calls api to create new ingredient option */
  async function addOption(option: Option) {
    try {
      const id = await API.postOption(option, name);
      return id;
    } catch (error: any) {
      errorHandling("IngredientDropDown - addOption", error)
    }
  }

  return (
    <DropdownWithSearch
      name={name}
      handleOptionChange={handleOptionChange}
      options={options}
      handleAddOption={handleAddOption}
      postRequest={addOption} />
  )
}

export default IngredientDropDown;