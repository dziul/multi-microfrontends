import { UrlMatcher, UrlSegment } from '@angular/router';

export function startsWith(prefix: string): UrlMatcher {
  return (url: UrlSegment[]) => {
    const fullUrl = url.map((u) => u.path).join('/');
    if (fullUrl.startsWith(prefix)) {
      return { consumed: url };
    }
    return null;
  };
}



type Scope = unknown;
type Factory = () => unknown;

type Container = {
  init(shareScope: unknown): Promise<void>;
  get(module: string): Promise<Factory>;
};

export type LoadRemoveModuleArg = {
  remoteEntry: string;
  exposedModule:string
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

const containerMap = new Map<string,Container>();
const remoteMap = new Map<string,unknown>();
/**
 * observado que quando há erro no carregamento do módulo por `import` não é possível tentar novamente
 *  pela mesma URL passada. Solução paliativa é mapear as url que houver erro e na retentativa aplicar
 *  _Query String_ genérica só para considerar como uma nova URL.
 */
const remoteRetryMap = new Map<string,boolean>()

/**
 * sinalizador se deve inicializar o escopo global de compartilhamento
 */
let isDefaultScopeInitialized = false;


/**
 * 
 * @param container Container a ser usado
 * @param key identificador do cache
 * @returns carrega e inicializa o Container. Caso exista, o cache é inicializado
 */
async function initRemote(container: Container, key: string) {
  // const container = window[key] as Container;

  if (remoteMap.get(key)) {
    return container;
  }

  if (!isDefaultScopeInitialized) {
    await __webpack_init_sharing__('default');
    isDefaultScopeInitialized = true;
  }

  await container.init(__webpack_share_scopes__.default);
  
  remoteMap.set(key, true);
  
  return container;
}


/**
 * obter o recurso exposto
 * 
 * @param container 
 * @param exposedModule 
 * @returns 
 */
async function lookupExposedModule<T>(
  container: Container,
  exposedModule: string
): Promise<T> {
  const factory = await container.get(exposedModule);
  const Module = factory();
  return Module as T;
}

/**
 * carrega modulo remoto.
 * 
 * caso haja erro no carregamento, a url passada internamente será modificada para nova tentativa.
 * 
 * @param remoteEntry URL do remote entry
 * @returns modulo carregado
 */
export async function loadRemoteModule<T>(config:LoadRemoveModuleArg): Promise<T> {
  const { exposedModule, remoteEntry } = config
  const cachedContainer = containerMap.get(remoteEntry)
  if (cachedContainer) {
    return await lookupExposedModule<T>(cachedContainer, exposedModule);
  }

  const parsedRemoteEntry = remoteRetryMap.get(remoteEntry) ? updateRemoteEntryUrl(remoteEntry): remoteEntry;

  const container = await import(/* webpackIgnore:true */ parsedRemoteEntry)
                            .catch((error)=>{

                              remoteRetryMap.set(remoteEntry, true)

                              throw error
                            });

  remoteRetryMap.delete(remoteEntry)

  await initRemote(container, remoteEntry);

  containerMap.set(remoteEntry, container);

  return await lookupExposedModule<T>(container, exposedModule);
}


/**
 * aplica um _query string_ para renovar da _URL_ passada
 * 
 * @param remoteEntryUrl 
 */
function updateRemoteEntryUrl(remoteEntryUrl:string){
  const url = new URL(remoteEntryUrl)

  url.searchParams.append(Date.now().toString(36), '1')

  return url.toString()
}