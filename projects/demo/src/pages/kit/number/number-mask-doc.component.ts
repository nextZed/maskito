import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
    ViewChild,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {TuiDocExample} from '@taiga-ui/addon-doc';
import {tuiInputCountOptionsProvider} from '@taiga-ui/kit';

type GeneratorOptions = Required<
    NonNullable<Parameters<typeof maskitoNumberOptionsGenerator>[0]>
>;

@Component({
    selector: 'number-mask-doc',
    templateUrl: './number-mask-doc.template.html',
    providers: [tuiInputCountOptionsProvider({min: Number.MIN_SAFE_INTEGER})],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocComponent implements GeneratorOptions {
    @ViewChild('apiPageInput', {read: ElementRef})
    apiPageInput!: ElementRef<HTMLInputElement>;

    readonly maskitoParseNumberDemo = import(
        './examples/maskito-parse-number-demo.md?raw'
    );

    readonly highPrecisionExample1: TuiDocExample = {
        MaskitoOptions: import('./examples/1-high-precision/mask.ts?raw'),
    };

    readonly separatorsExample2: TuiDocExample = {
        MaskitoOptions: import('./examples/2-separators/mask.ts?raw'),
    };

    readonly postfixExample3: TuiDocExample = {
        MaskitoOptions: import('./examples/3-postfix/mask.ts?raw'),
    };

    readonly decimalZeroPaddingExample4: TuiDocExample = {
        MaskitoOptions: import('./examples/4-decimal-zero-padding/mask.ts?raw'),
    };

    readonly dynamicDecimalZeroPaddingExample5: TuiDocExample = {
        MaskitoOptions: import('./examples/5-dynamic-decimal-zero-padding/mask.ts?raw'),
        Component: import('./examples/5-dynamic-decimal-zero-padding/component.ts?raw'),
    };

    apiPageControl = new FormControl('');

    maskitoOptions: MaskitoOptions = maskitoNumberOptionsGenerator(this);

    readonly decimalPseudoSeparatorsOptions = [['.', ',', 'б', 'ю'], ['.'], [',']];
    readonly precisionOptions: number[] = [0, 1, 2, 5, 10, Infinity];

    precision = 0;
    isNegativeAllowed = true;
    max = Number.MAX_SAFE_INTEGER;
    decimalSeparator = '.';
    decimalZeroPadding = false;
    decimalPseudoSeparators = this.decimalPseudoSeparatorsOptions[0];
    thousandSeparator = ' ';
    prefix = '';
    postfix = '';

    constructor(private readonly ngZone: NgZone) {}

    updateOptions(): void {
        this.maskitoOptions = maskitoNumberOptionsGenerator(this);
    }

    onFocus(): void {
        let value: string = this.apiPageControl.value;

        if (!value) {
            value = this.prefix + this.postfix;
            this.apiPageControl.patchValue(value);
        }

        if (this.postfix) {
            const newCaretIndex = value.length - this.postfix.length;

            this.ngZone.runOutsideAngular(() => {
                setTimeout(() => {
                    // To put cursor before postfix
                    this.apiPageInput.nativeElement.setSelectionRange(
                        newCaretIndex,
                        newCaretIndex,
                    );
                });
            });
        }
    }

    onBlur(): void {
        const value = this.apiPageControl.value;

        if (value && value === this.prefix + this.postfix) {
            this.apiPageControl.patchValue('');
        }
    }
}
