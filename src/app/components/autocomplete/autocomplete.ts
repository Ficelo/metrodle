import { Component, computed, ElementRef, input, output, signal, viewChild } from '@angular/core';

export interface AutocompleteOption {
  id: string | number;
  label: string;
}

@Component({
  imports: [],
  selector: 'metrodle-autocomplete',
  styleUrl: './autocomplete.scss',
  templateUrl: './autocomplete.html',
})
export class Autocomplete {

  options = input<AutocompleteOption[]>([]);
  placeholder = input<string>('Search...');
  maxResults = input<number>(6);
  disabled = input(false);

  selected = output<AutocompleteOption>();
  cleared = output<void>();

  query = signal<string>('');
  isOpen = signal<boolean>(false);
  activeIndex = signal<number>(-1);

  private inputElement = viewChild<ElementRef<HTMLInputElement>>('input');

  filteredOptions = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    
    if (query.length <= 0) {
      return [];
    }

    if (!query) {
      return this.options().slice(0, this.maxResults());
    }

    return this.options()
      .filter(option => option.label.toLocaleLowerCase().includes(query))
      .slice(0, this.maxResults());
  });

  onInput(event: Event):  void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.query.set(value);
    this.activeIndex.set(-1);

    this.isOpen.set(!this.disabled() && value.length > 0);
  }

  onFocus(): void {
    if (this.disabled()) {
      return;
    }

    if (this.query().length > 0) {
      this.isOpen.set(true);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const options = this.filteredOptions();

    switch (event.key) {
      case 'ArrowDown': 
        event.preventDefault();
        
        if (!this.isOpen()) {
          this.isOpen.set(true);
          return;
        }

        if (options.length > 0) {
          this.activeIndex.update(index => index < options.length - 1 ? index + 1 : 0 );
        }
        
        break;
        
      case 'ArrowUp': 
        event.preventDefault();

        if (options.length > 0) {
          this.activeIndex.update(index => index <= 0 ? options.length - 1 : index - 1 );
        }

        break; 
      
      case 'Enter': 
        event.preventDefault(); 
        const index = this.activeIndex();
        
        if (index >= 0 && options[index]) {
          this.select(options[index]);
        }
        
        break;
      
      case 'Escape': 
        event.preventDefault();
        this.close();
        break;

    }
  }

  select(option: AutocompleteOption): void {
    this.query.set(option.label);
    this.isOpen.set(false);
    this.activeIndex.set(-1);

    this.selected.emit(option);
    this.clear();
    this.inputElement()?.nativeElement.focus();
  }

  clear(): void {
    this.query.set('');
    this.isOpen.set(false);
    this.activeIndex.set(-1);
    this.cleared.emit();
    this.inputElement()?.nativeElement.focus();
  }

  close(): void {
    this.isOpen.set(false);
    this.activeIndex.set(-1);
  }

  optionId(index: number): string {
    return `autocomplete-option-${index}`;
  }

}
