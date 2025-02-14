# syntax=docker/dockerfile:1
ARG VERSION=1.1.8
ARG VARIANT=22-bookworm
ARG SHA=sha256:896bfba10582c9239d1c36bab53b80af06253019f62b846fa440ee643ca63eb1
FROM mcr.microsoft.com/devcontainers/javascript-node:${VERSION}-${VARIANT}

ARG USER=node
ARG DEBIAN_FRONTEND=noninteractive
RUN usermod -s /bin/bash ${USER}

# Node server port
EXPOSE 3000


USER ${USER}
ARG HOME=/home/${USER}
WORKDIR ${HOME}

ARG PNPM_VERSION=10.2.0
ARG PNPM_HOME=${HOME}/.local/share/pnpm
ENV PATH="${PNPM_HOME}:$PATH"
RUN wget -qO- https://get.pnpm.io/install.sh | env PNPM_VERSION=${PNPM_VERSION} ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -

RUN --mount=type=cache,id=pnpm,target=${PNPM_HOME}/store \
    && pnpm fetch --store-dir=${PNPM_HOME}/store

# Install Tini
ARG TINI_VERSION=v0.19.0
ADD https://github.com/krallin/tini/releases/download/$TINI_VERSION/tini /tini
RUN chmod +x /tini

ENTRYPOINT ["/tini", "--"]

CMD ["/bin/bash"]
