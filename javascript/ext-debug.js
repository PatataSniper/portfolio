// Clase auxiliar de log para desarrollo.
//
// Se utiliza para enviar información que ayude a depurar el
// código, se puede apagar o encender con la modificación de
// la propiedad 'debugActivo'
//////////////////////////////////////////////////////////////

class ExtDebug {
    // Trace types. Thanks to Ackshaey Singh in dev.to for the idea
    // https://dev.to/ackshaey/level-up-your-javascript-browser-logs-with-these-console-log-tips-55o2
    static traceType = {
        default: 'default',
        call: 'call',
        servCall: 'server call',
        init: 'init'
    }

    // Custom colors for trace types. Thanks to Ackshaey Singh in dev.to for the idea 
    // https://dev.to/ackshaey/level-up-your-javascript-browser-logs-with-these-console-log-tips-55o2
    static TRACE_TYPE_FONT_COLORS = {
        [this.traceType.call]: 'color: #FFFACC',
        [this.traceType.servCall]: 'color: #cc99ff',
        [this.traceType.init]: 'color: MediumTurquoise',
    }

    static TRACE_TYPE_LABEL_COLORS = {
        [this.traceType.call]: 'color:black; background-color:#FFFACC; padding: 2px; border-radius: 5px',
        [this.traceType.servCall]: 'color:white; background-color:MediumPurple; padding: 2px; border-radius: 5px',
        [this.traceType.init]: 'color:black; background-color:MediumTurquoise; padding: 2px; border-radius: 5px',
    }

    // Regularmente debe ser false para no enviar información a consola; debe ser su valor ordinario
    static __debugActive = true;

    static get debugActivo() {
        // Se deberá mostrar, o no, información de depuracion. 
        return ExtDebug.__debugActive;
    }

    static toggleDebug() {
        // Toggles the debug system
        ExtDebug.__debugActive = !ExtDebug.__debugActive;
        console.log(`Debug system ${ExtDebug.__debugActive ? 'activated' : 'deactivated'}`);
    }

    /**
     * Default style applied to single string argument traces. Idea improved via the TRACE_TYPE_FONT_COLORS
     * and TRACE_TYPE_LABEL_COLORS objects
     */
    static get defTraceStyle() {
        return 'color:#004700; background-color:#FFFACC;';
    }

    static get _colorHemClaro() {
        return 'background-color:lightyellow';
    }

    static runTests() {
        // log siempre, aunque la bandera este desactivada
        let color = this.debugActivo ? 'aquamarine' : 'lightcoral';
        let estilo = `background-color:${color};`;
        console.log(`%cExtDebug.probar\n` +
            `debugActivo: %c${this.debugActivo}%c\n` +
            `defTraceStyle: %c${this.defTraceStyle}`,
            this._colorHemClaro,
            estilo,
            this._colorHemClaro,
            this.defTraceStyle);

        ExtDebug.trace('------- inicio pruebas -------');

        ExtDebug.log('mensaje log (independiente de "debugActivo")'); // aparece siempre
        ExtDebug.error('mensaje error'); // aparece siempre
        ExtDebug.trace('mensaje trace');
        ExtDebug.trace('titulo', 'mensaje');
        ExtDebug.trace('str1', 'str2', 'str3');
        ExtDebug.trace('%c string con estilo especifico', 'background-color:aquamarine; font-style: italic');

        // objetos
        let obj1 = { id: 1, nombreEntidad: 'prueba' };
        let obj2 = { id: 2, entidad: 'prueba2' };
        ExtDebug.trace(obj1);
        ExtDebug.trace(obj1, obj2);

        ExtDebug.assert(true, 'assert true'); // no se muestra
        ExtDebug.assert(false, 'assert false'); // se muestra en consola

        // Depurar parametros
        ExtDebug.deb(1, 'dos', 3, obj1);

        ExtDebug.trace('------- fin pruebas -------');
    }

    /**
     * Encontraremos inputs con nombres idénticos dentro de un contexto
     * @param {JQuery} $context El contexto en el cual realizar la búsqueda
     */
    static InputsNombresRepetidos($context = null) {
        let inputs = $context ? $("input", $context) : $("input");
        let repetidos = []; // Array de elementos repetidos
        let nombres = [];
        inputs.each(function () {
            let input = jQuery(this);
            let nombre = input.attr('name');
            if (nombres.includes(nombre)) {
                repetidos.push(input);
            }
            else {
                nombres.push(nombre);
            }
        });

        if (repetidos.length === 0) {
            console.log("No existen inputs con nombres repetidos");
            return;
        }

        // Existen elementos con nombres repetidos, los encontraremos y agregaremos al diccionario de resultado
        let resultado = {};
        repetidos.forEach(input => {
            let nombre = input.attr('name');

            // Encontramos todos los inputs con este nombre, para mostrar la mayor información posible
            let inputsAgrupados = $(`[name="${nombre}"]`);
            resultado[nombre] = inputsAgrupados;
        });

        console.log("Elementos repetidos agrupados por nombre: ");
        for (let llave in resultado) {
            let valor = resultado[llave];
            console.log(llave);
            console.log(valor);
        }

        return Object.keys(resultado);
    }

    /**
     * Elimina la clase 'hidden' de todos los inputs en pantalla. se puede
     * especificar un contexto de búsqueda
     * @param {JQuery} $context El contexto de búsqueda de inputs
     */
    static MostrarInputs($context) {
        let elementos;
        if (!$context || !$context.length) {
            elementos = $("input");
        }
        else {
            elementos = $("input", $context)
        }

        elementos.removeClass("hidden");
        elementos.attr("type", 'text');
    }

    static log(...args) {
        // todo: utilizar console.debug ?
        console.log(...args);
    }

    /**
     * 
     * Gracias a Ivan Pro
     * https://gist.github.com/colorwebdesigner/647e86b79048a7eedfac2d74ddf08d5f
     * 
     * [deb] Debugging function
     * Pass any kind of variables and 
     * see the result 
     * 
     * @return {[false]} [always]
     */
    static deb() {
        let msg = '';

        msg += (arguments.length == 0) ? '(!) debug: don\'t spend my time.\n' : '---\ndeb args\n---\n';

        for (let i = 0, j = arguments.length; i < j; i++) {
            msg += `arg${i} [${typeof (arguments[i])}]: ${arguments[i]}` + '\n';
        }

        msg += `---` + '\n';

        this.trace(msg);
        return false;
    }

    //static trace(...args) {
    //    if (!this.debugActivo) {
    //        // hacer nada
    //        return;
    //    }

    //    if (args.length == 1 && typeof (args[0]) == 'string' && this.defTraceStyle) {
    //        return this.log(`%c${args[0]}`, this.defTraceStyle);
    //    }

    //    console.log(...args);
    //}

    /**
     * Prints a trace to the console. Works with customized styles configured by trace types.
     * Improved version of the original 'trace' method
     * @param {string} msg The principal trace message. Printed before any other argument
     * @param {object} args The arguments to print after the principal message
     * @param {string} type The trace type. Used to apply a custom style to the trace
     * @returns
     */
    static trace(msg, args = null, type = this.traceType.default) {
        if (!this.debugActivo) {
            // Nothing to do
            return;
        }

        if (this.TRACE_TYPE_FONT_COLORS[type]) {
            // Custom trace type. Apply the custom style to the log message
            console.log('%c%s%c %s', this.TRACE_TYPE_LABEL_COLORS[type], type, this.TRACE_TYPE_FONT_COLORS[type], msg, args);
        }
        else {
            if (msg && !args && typeof (msg) == 'string' && this.defTraceStyle) {
                // Mantaining the old behavior of the 'trace' method for a single string argument
                console.log(`%c${msg}`, this.defTraceStyle);
            }
            else {
                // Default behavior
                console.log(`${msg}`, args);
            }
        }

        // Print the trace inside a collapsed group. This allows to have the full trace printed
        // and expanded only when needed
        console.groupCollapsed('...');
        console.trace();
        console.groupEnd();
    }

    /**
     * Prints a trace to the console. Specific type to reprecent a function call.
     * @param {object} obj The traced method's parent object
     * @param {object} meth The traced method
     * @param {object} args The traced method arguments
     * @returns
     */
    static callTrace(obj, meth, args) {
        // Print a trace of type "call"
        const msg = `${obj.constructor.name}.${meth.name}`;
        this.trace(msg, args, this.traceType.call);
    }

    /**
     * Prints a trace to the console. Specific type to reprecent a server-function call.
     * @param {string} msg The principal trace message. Printed before any other argument
     * @param {object} args The function arguments to print after the principal message
     * @returns
     */
    static servCallTrace(msg, args) {
        // Print a trace of type "server call"
        this.trace(msg, args, this.traceType.servCall);
    }

    /**
     * Prints a trace to the console. Specific type to reprecent an initialization call.
     * @param {object} obj The traced method's parent object
     * @param {object} meth The traced method
     * @param {object} args The traced method arguments
     * @returns
     */
    static initTrace(obj, meth, args) {
        // Print a trace of type "initialization"
        const msg = `${obj.constructor.name}.${meth.name}`;
        this.trace(msg, args, this.traceType.init);
    }

    static error(...args) {
        if (!this.debugActivo) {
            // hacer nada
            return;
        }

        return console.error(...args);
    }

    static assert(assert, ...args) {
        if (!this.debugActivo) {
            // hacer nada
            return;
        }

        console.assert(assert, ...args);
    }

    // Esta función no es necesaria, Debug.log(obj) muestra mejor información.
    // static traceObj(obj) {
    //     if (typeof (obj) != 'object') {
    //         this.trace('"obj" no es un objeto que pueda mostrar propiedades')
    //     }

    //     this.trace(`traceObj: '${obj.constructor.name}'`)
    //     for(let k in obj) {            
    //         let msj = `${k}: ${obj[k]}`;
    //         this.trace(msj);
    //     }

    //     console.log(obj);
    // }

}